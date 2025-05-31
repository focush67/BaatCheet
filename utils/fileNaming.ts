export function generateUniqueFileName(...parts: string[]): string {
  const timestamp = new Date().toISOString() 
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const sanitizedParts = parts.map(part =>
    part.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
  );
  return `${sanitizedParts.join('_')}_${timestamp}_${randomSuffix}`;
}
