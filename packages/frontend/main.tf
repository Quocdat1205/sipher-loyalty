
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Main region where the resources should be created in
# (Should be close to the location of your viewers)
provider "aws" {
  region = var.region
}

# Provider used for creating the Lambda@Edge function which must be deployed
# to us-east-1 region (Should not be changed)
provider "aws" {
  alias  = "global_region"
  region = "us-east-1"
}

# Terraform remote state, store its state on s3 instead of local
terraform {
  backend "s3" {
    key    = "terraform-loyalty-state-key"
  }
}

module "tf_next" {
  source = "milliHQ/next-js/aws"
  deployment_name = "tf-next-loyalty"

  providers = {
    aws.global_region = aws.global_region
  }

  cloudfront_aliases                    = var.cloudfront_aliases
  cloudfront_acm_certificate_arn        = var.cloudfront_acm_certificate_arn
  cloudfront_price_class                = "PriceClass_All"
  cloudfront_minimum_protocol_version   = "TLSv1.2_2021"
}


output "cloudfront_domain_name" {
  value = module.tf_next.cloudfront_domain_name
}