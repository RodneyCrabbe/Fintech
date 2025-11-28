import { 
  generateReactPackage, 
  generateVuePackage,
  generateHtmlPackage,
  type GeneratorProgress,
  type FormatType,
  AVAILABLE_FORMATS
} from './generators'

// Re-export types and constants
export { AVAILABLE_FORMATS }
export type { GeneratorProgress, FormatType }

// Type for download progress
export interface DownloadProgress {
  status: 'preparing' | 'generating' | 'downloading' | 'complete' | 'error'
  progress: number
  message: string
}

// Package generation options
export interface PackageOptions {
  format: FormatType
  includePages?: boolean
  includeDocs?: boolean
  onProgress?: (progress: DownloadProgress) => void
}

// Main function to generate package based on format
export async function generatePackage(options: PackageOptions): Promise<void> {
  const { 
    format, 
    includePages = true, 
    includeDocs = true, 
    onProgress 
  } = options

  const handleProgress = (progress: GeneratorProgress) => {
    onProgress?.(progress)
  }

  switch (format) {
    case 'react':
      await generateReactPackage({
        includePages,
        includeDocs,
        onProgress: handleProgress
      })
      break

    case 'vue':
      await generateVuePackage({
        includePages,
        includeDocs,
        onProgress: handleProgress
      })
      break

    case 'html':
      await generateHtmlPackage({
        includePages,
        includeDocs,
        onProgress: handleProgress
      })
      break

    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

// Legacy function for backward compatibility
export async function generateAndDownloadPackage(
  onProgress?: (progress: DownloadProgress) => void
): Promise<void> {
  await generatePackage({
    format: 'react',
    includePages: true,
    includeDocs: true,
    onProgress
  })
}

// Function to generate all formats at once (for "Download All" functionality)
export async function generateAllPackages(
  onProgress?: (progress: DownloadProgress) => void
): Promise<void> {
  const formats: FormatType[] = ['react', 'vue', 'html']
  const totalFormats = formats.length
  
  for (let i = 0; i < formats.length; i++) {
    const format = formats[i]
    const baseProgress = (i / totalFormats) * 100
    
    onProgress?.({
      status: 'generating',
      progress: baseProgress,
      message: `Generating ${format} package (${i + 1}/${totalFormats})...`
    })

    await generatePackage({
      format,
      includePages: true,
      includeDocs: true,
      onProgress: (p) => {
        const adjustedProgress = baseProgress + (p.progress / totalFormats)
        onProgress?.({
          ...p,
          progress: adjustedProgress,
          message: `[${format.toUpperCase()}] ${p.message}`
        })
      }
    })

    // Small delay between downloads to prevent browser issues
    if (i < formats.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  onProgress?.({
    status: 'complete',
    progress: 100,
    message: 'All packages downloaded!'
  })
}

// Quick download functions for each format
export async function downloadReactPackage(
  onProgress?: (progress: DownloadProgress) => void
): Promise<void> {
  await generatePackage({ format: 'react', onProgress })
}

export async function downloadVuePackage(
  onProgress?: (progress: DownloadProgress) => void
): Promise<void> {
  await generatePackage({ format: 'vue', onProgress })
}

export default generateAndDownloadPackage
