// Export all generators
export { generateReactPackage, type ReactGeneratorOptions } from './reactGenerator'
export { generateVuePackage, type VueGeneratorOptions } from './vueGenerator'

export type FormatType = 'react' | 'vue'

export interface GeneratorProgress {
  status: 'preparing' | 'generating' | 'downloading' | 'complete' | 'error'
  progress: number
  message: string
}

export interface FormatInfo {
  id: FormatType
  name: string
  description: string
  fileExtension: string
  icon: string
}

export const AVAILABLE_FORMATS: FormatInfo[] = [
  {
    id: 'react',
    name: 'React Components',
    description: 'TypeScript + Tailwind CSS components for React 18+',
    fileExtension: 'zip',
    icon: 'react'
  },
  {
    id: 'vue',
    name: 'Vue.js Components',
    description: 'Vue 3 SFC components with Composition API',
    fileExtension: 'zip',
    icon: 'vue'
  }
]
