# Atherlabs Dashboard Project

## Contract
- lootbox_mumbai    : 0x3E445D426c8FdE12F5F0C223019CA9158f7Da93B
- lootbox_polygon   : 0x105c1fDa04c7406D4106C96bc5b674f7d6B1A617
- sculpture_mumbai  : 0x3EdB954303D0A13ee347C6989189294B0422E7D6
- sculpture_polygon : 0x04c20C117F7F470620F45a1c685f50ef1516a958

## Service 
- Ather_Id_dev      : https://api-atherid.sipher.gg
- Ather_Id_prod     : https://api-atherid.atherlabs.xyz
- Ather_social_dev  : https://api-ather-social.sipher.gg
- Ather_social_prod : https://api-atherid.atherlabs.xyz

## link dashboard
- api-dev           : https://api-loyalty.sipher.gg/api/
- web-dev           : https://loyalty.sipher.gg
- api-prod          : https://api-dashboard.atherlabs.xyz/api/
- web-prod          : https://dashboard.atherlabs.xyz/

## set varible backend
- local             : set in .env file (packages/backend/src/.env) & config in packages/backend/src/setting/constant
- dev               : set in .deploy/develop/backend.yaml & config at packages/backend/src/setting/constant
- prod              : set in .deploy/production/backend.yaml & config at packages/backend/src/setting/constant


## set varible frontend
- local             : setup in .env.local file (packages/frontend/src/.env.local)
- dev               : setup in .github/workflows/ci.yaml (top)
- prod              : setup in .github/workflows/ci.yaml (bottom)

## Note
phase 1:
- Done:
    + baseUri for erc1155 lootbox/sculpture
    + tracker for erc1155 (mint/burn/cancel/expired)
    + claim lootbox with expiredDate
    + mint + burn + cancel Lootbox
    + get data lootbox/claimableLootbox/pendingMint by AtherId ( will remove unused api get data by wallet)
    + get data airdrop/merch/other by wallet ( will update to get by AtherId)
    + get data collection/nft from elasticsearch of SipherMarketplace 
    + get price/info of Sipher/Eth token from Coinmarketcap
    + distribute/get/update data for Administrator
- Will update:
    + get data airdrop/merch/other by AtherId
    + verify distribute data by admin's signature
    + update verify admin role of each module
    + refactor code 

phase 2:
    + open lootbox to 5 part of spaceship with true random rarity
    + baseuri for erc1155 spaceshipPart
    + scrap 3 spaceshipPart with same rarity to higher rarity 
    + shipping cart (merch, sculpture)

## Docker
- run at /sipher_loyalty/ ( read README.md at ./docker)


## Backend
- run at /sipher_loyalty/packages/backend/ ( read README.md at ./packages/backend)

## Frontend
- run at /sipher_loyalty/packages/frontend/ 