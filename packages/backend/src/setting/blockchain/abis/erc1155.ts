export const erc1155Abi = [
  "event TransferSingle(operator, from, to, id, value)",
  "event TransferBatch(operator, from, to, ids, values)",
  "event ApprovalForAll(account, operator, approved)",
  "event URI(value, id)",
  "function balanceOf(account, id)",
  "function balanceOfBatch(accounts, ids)",
  "function setApprovalForAll(operator, approved)",
  "function isApprovedForAll(account, operator)",
  "function safeTransferFrom(from, to, id, amount, data)",
  "function safeBatchTransferFrom(from, to, ids, amounts, data)",
]
