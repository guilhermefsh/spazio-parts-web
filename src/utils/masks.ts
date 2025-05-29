import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskCPF(value: string): string {
  const numbers = value.replace(/\D/g, '')

  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function maskPhone(value: string): string {
  const numbers = value.replace(/\D/g, '')

  return numbers
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export function removeMask(value: string): string {
  return value.replace(/\D/g, '')
}

export function maskCEP(value: string): string {
  const numbers = value.replace(/\D/g, '')

  return numbers
    .replace(/(\d{5})(\d)/, '$1-$2')
}
