export const erc1155Abi = [
  "event TransferSingle(operator, from, to, id, value)",
  "event TransferBatch(address indexed operator,address indexed from,address indexed to,uint256[] ids,uint256[] values)",
  "event ApprovalForAll(account, operator, approved)",
  "event  MintedBatch(address indexed minter,uint256[] batchID,uint256[] amount,string salt);",
  "event  Minted(address indexed minter,uint256 batchID,uint256 amount,string salt);",
  "event URI(value, id)",
  "function balanceOf(account, id)",
  "function balanceOfBatch(accounts, ids)",
  "function setApprovalForAll(operator, approved)",
  "function isApprovedForAll(account, operator)",
  "function safeTransferFrom(from, to, id, amount, data)",
  "function safeBatchTransferFrom(from, to, ids, amounts, data)",
];
