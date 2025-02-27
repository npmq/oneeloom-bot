/**
 * Formats an object into a readable string where each key-value pair appears on a new line.
 * @param messageObj - An object containing message key-value pairs.
 * @returns A formatted string representing the object.
 */
export const formatMessageObject = (messageObj: Record<string, string>): string => {
  try {
    return Object.entries(messageObj)
      .map(([label, text]) => `${label}: ${text}`)
      .join('\n')
  } catch (error) {
    console.error('❌ Error formatting message object:', error)
    
    return '❌ Error formatting message'
  }
}