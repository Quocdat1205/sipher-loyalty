import React, { Component } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import PropTypes from "prop-types"
import { Box, Flex, IconButton } from "@sipher.dev/sipher-ui"

import Slide from "./Slide"

type Slide = {
  content: JSX.Element
  onClick?: () => void
  key: any
}

const DEFAULT_GO_TO_SLIDE_DELAY = 200

interface IState {
  index: number
  goToSlide: number | null
  prevPropsGoToSlide: number
  newSlide: boolean
}

interface IProps {
  slides: Slide[]
  goToSlide?: number
  showNavigation: boolean
  offsetRadius: number
  goToSlideDelay: number
}

function mod(a: number, b: number): number {
  return ((a % b) + b) % b
}

class Carousel extends Component<IProps, IState> {
  state: IState = {
    index: 0,
    goToSlide: null,
    prevPropsGoToSlide: 0,
    newSlide: false,
  }

  goToIn?: number

  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        content: PropTypes.object,
      }),
    ).isRequired,
    goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number,
    goToSlideDelay: PropTypes.number,
  }

  static defaultProps = {
    offsetRadius: 2,
    goToSlideDelay: DEFAULT_GO_TO_SLIDE_DELAY,
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    const { goToSlide } = props

    if (goToSlide !== state.prevPropsGoToSlide) {
      return { prevPropsGoToSlide: goToSlide, goToSlide, newSlide: true }
    }

    return null
  }

  componentDidUpdate() {
    const { goToSlideDelay } = this.props
    const { index, goToSlide, newSlide } = this.state
    if (typeof goToSlide === "number") {
      if (newSlide) {
        this.handleGoToSlide()
      } else if (index !== goToSlide && typeof window !== "undefined") {
        window.clearTimeout(this.goToIn)
        this.goToIn = window.setTimeout(this.handleGoToSlide, goToSlideDelay)
      } else if (typeof window !== "undefined") {
        window.clearTimeout(this.goToIn)
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.clearTimeout(this.goToIn)
    }
  }

  modBySlidesLength = (index: number): number => {
    return mod(index, this.props.slides.length)
  }

  moveSlide = (direction: -1 | 1) => {
    this.setState({
      index: this.modBySlidesLength(this.state.index + direction),
      goToSlide: null,
    })
  }

  getShortestDirection(from: number, to: number): -1 | 0 | 1 {
    if (from > to) {
      if (from - to > this.props.slides.length - 1 - from + to) {
        return 1
      } else return -1
    } else if (to > from) {
      if (to - from > from + this.props.slides.length - 1 - to) {
        return -1
      } else return 1
    }
    return 0
  }

  handleGoToSlide = () => {
    if (typeof this.state.goToSlide !== "number") {
      return
    }

    const { index } = this.state

    const goToSlide = mod(this.state.goToSlide, this.props.slides.length)

    if (goToSlide !== index) {
      const direction = this.getShortestDirection(index, goToSlide)
      const isFinished = this.modBySlidesLength(index + direction) === goToSlide

      this.setState({
        index: this.modBySlidesLength(index + direction),
        newSlide: isFinished,
        goToSlide: isFinished ? null : goToSlide,
      })
    }
  }

  clampOffsetRadius(offsetRadius: number): number {
    const { slides } = this.props
    const upperBound = Math.floor((slides.length - 1) / 2)

    if (offsetRadius < 0) {
      return 0
    }
    if (offsetRadius > upperBound) {
      return upperBound
    }

    return offsetRadius
  }

  getPresentableSlides(): Slide[] {
    const { slides } = this.props
    const { index } = this.state
    let { offsetRadius } = this.props
    offsetRadius = this.clampOffsetRadius(offsetRadius)
    const presentableSlides: Slide[] = []

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[this.modBySlidesLength(index + i)])
    }

    return presentableSlides
  }

  render() {
    const { offsetRadius, showNavigation } = this.props

    return (
      <React.Fragment>
        <Box pos="relative" w="full" h="full">
          {this.getPresentableSlides().map((slide: Slide, presentableIndex: number) => (
            <Slide
              key={slide.key}
              content={slide.content}
              onClick={slide.onClick}
              offsetRadius={this.clampOffsetRadius(offsetRadius)}
              index={presentableIndex}
            />
          ))}
        </Box>
        {showNavigation && (
          <Flex pos="relative" h="1.6rem" m="0 auto" w="20%" mt={4} justify="space-between">
            <IconButton
              aria-label="left"
              color="neutral.900"
              icon={<BiChevronLeft size="2rem" />}
              onClick={() => this.moveSlide(-1)}
              mr={8}
            />
            <IconButton
              aria-label="right"
              color="neutral.900"
              icon={<BiChevronRight size="2rem" />}
              onClick={() => this.moveSlide(1)}
              ml={8}
            />
          </Flex>
        )}
      </React.Fragment>
    )
  }
}
export default Carousel
