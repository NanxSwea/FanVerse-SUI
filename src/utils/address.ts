/**
 * Truncates a blockchain address for display purposes
 * @param address The full address string
 * @param chars Number of characters to show at the beginning and end
 * @returns Truncated address with ellipsis
 */
export const truncateAddress = (address: string, chars: number = 4): string => {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  
  const start = address.substring(0, chars);
  const end = address.substring(address.length - chars);
  
  return `${start}...${end}`;
};