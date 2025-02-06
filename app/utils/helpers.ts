export function formatCharacteristic(str: string) {
  return str
    ?.toLowerCase()
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "")
    ?.replace(/[^\w\s]/g, "")
    ?.replace(/\s+/g, "-");
}
