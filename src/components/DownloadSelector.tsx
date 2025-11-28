import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  generatePackage, 
  generateAllPackages,
  AVAILABLE_FORMATS, 
  type FormatType, 
  type DownloadProgress 
} from '@/lib/downloadPackage'

interface DownloadSelectorProps {
  className?: string
  isDark?: boolean
  onDownloadStart?: (format: FormatType | 'all') => void
  onDownloadComplete?: (format: FormatType | 'all') => void
  onDownloadError?: (error: Error, format: FormatType | 'all') => void
}

// Format icons
const formatIcons: Record<FormatType, React.ReactNode> = {
  react: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-10c-1.4 0-2.67.17-3.78.5-.59.17-1.12.37-1.6.6-1.26.62-2.09 1.4-2.47 2.31-.19.45-.15.94.1 1.37.49.86 1.54 1.44 2.88 1.72 0 0 .02 0 .03 0 .7.14 1.47.22 2.3.25.04 0 .08.01.12.01.29.02.59.03.89.03.04 0 .08-.01.12-.01.42-.01.82-.03 1.2-.07.55-.06 1.08-.14 1.56-.26 0 0 .02 0 .02 0 1.41-.35 2.52-1.02 2.99-1.99.21-.43.21-.91.01-1.37-.38-.91-1.21-1.69-2.47-2.31-.48-.23-1.01-.43-1.6-.6C14.67 3.67 13.4 3.5 12 3.5z"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/>
    </svg>
  ),
  vue: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 3h3.5L12 15l6.5-12H22L12 22 2 3zm4.5 0H9l3 5.5L15 3h2.5L12 13.5 6.5 3z"/>
    </svg>
  ),
  html: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.136 3.012h15.729l-1.431 16.15-6.451 1.826-6.414-1.826-1.433-16.15zm5.266 7.302l-.173-2.249 7.633.019.173-2.039H6.916l.532 6.282h7.412l-.326 3.663-2.55.674-2.534-.674-.163-1.96H7.262l.306 3.67 4.412 1.238 4.445-1.238.627-7.386H9.402z"/>
    </svg>
  ),
}

// Format colors
const formatColors: Record<FormatType, { bg: string; bgDark: string; text: string; border: string }> = {
  react: { 
    bg: 'bg-cyan-100', 
    bgDark: 'bg-cyan-500/20', 
    text: 'text-cyan-500',
    border: 'border-cyan-500/50'
  },
  vue: { 
    bg: 'bg-emerald-100', 
    bgDark: 'bg-emerald-500/20', 
    text: 'text-emerald-500',
    border: 'border-emerald-500/50'
  },
  html: { 
    bg: 'bg-orange-100', 
    bgDark: 'bg-orange-500/20', 
    text: 'text-orange-500',
    border: 'border-orange-500/50'
  },
}

export const DownloadSelector: React.FC<DownloadSelectorProps> = ({
  className,
  isDark = true,
  onDownloadStart,
  onDownloadComplete,
  onDownloadError,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatType | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState<DownloadProgress | null>(null)
  const [downloadingFormat, setDownloadingFormat] = useState<FormatType | 'all' | null>(null)

  const handleDownload = async (format: FormatType) => {
    if (isDownloading) return

    try {
      setIsDownloading(true)
      setDownloadingFormat(format)
      setProgress(null)
      onDownloadStart?.(format)

      await generatePackage({
        format,
        includePages: true,
        includeDocs: true,
        onProgress: setProgress,
      })

      onDownloadComplete?.(format)
    } catch (error) {
      console.error('Download error:', error)
      onDownloadError?.(error instanceof Error ? error : new Error('Download failed'), format)
    } finally {
      setIsDownloading(false)
      setDownloadingFormat(null)
      setTimeout(() => setProgress(null), 2000)
    }
  }

  const handleDownloadAll = async () => {
    if (isDownloading) return

    try {
      setIsDownloading(true)
      setDownloadingFormat('all')
      setProgress(null)
      onDownloadStart?.('all')

      await generateAllPackages(setProgress)

      onDownloadComplete?.('all')
    } catch (error) {
      console.error('Download error:', error)
      onDownloadError?.(error instanceof Error ? error : new Error('Download failed'), 'all')
    } finally {
      setIsDownloading(false)
      setDownloadingFormat(null)
      setTimeout(() => setProgress(null), 2000)
    }
  }

  return (
    <div className={cn(
      'rounded-2xl border overflow-hidden',
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200',
      className
    )}>
      {/* Header */}
      <div className={cn(
        'flex items-center justify-between px-5 py-4 border-b',
        isDark ? 'border-slate-800' : 'border-slate-100'
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            isDark ? 'bg-violet-500/20' : 'bg-violet-100'
          )}>
            <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div>
            <h3 className={cn(
              'font-semibold',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Download UI Kit
            </h3>
            <p className={cn(
              'text-sm',
              isDark ? 'text-slate-500' : 'text-slate-500'
            )}>
              Choose your preferred format
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadAll}
          disabled={isDownloading}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            'flex items-center gap-2',
            isDownloading 
              ? 'opacity-50 cursor-not-allowed' 
              : isDark 
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600' 
                : 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600'
          )}
        >
          {downloadingFormat === 'all' ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download All</span>
            </>
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {progress && (
        <div className={cn(
          'px-5 py-3 border-b',
          isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-slate-50'
        )}>
          <div className="flex items-center justify-between mb-2">
            <span className={cn(
              'text-sm font-medium',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              {progress.message}
            </span>
            <span className={cn(
              'text-sm',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              {Math.round(progress.progress)}%
            </span>
          </div>
          <div className={cn(
            'h-2 rounded-full overflow-hidden',
            isDark ? 'bg-slate-700' : 'bg-slate-200'
          )}>
            <div 
              className={cn(
                'h-full rounded-full transition-all duration-300',
                progress.status === 'error' 
                  ? 'bg-red-500' 
                  : progress.status === 'complete'
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-violet-500 to-purple-500'
              )}
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Format Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AVAILABLE_FORMATS.map((format) => {
          const colors = formatColors[format.id]
          const isSelected = selectedFormat === format.id
          const isCurrentlyDownloading = downloadingFormat === format.id

          return (
            <div
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={cn(
                'relative rounded-xl border p-4 cursor-pointer transition-all duration-200',
                isSelected
                  ? cn(colors.border, isDark ? colors.bgDark : colors.bg)
                  : isDark
                    ? 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    isDark ? colors.bgDark : colors.bg
                  )}>
                    <span className={colors.text}>
                      {formatIcons[format.id]}
                    </span>
                  </div>
                  <div>
                    <h4 className={cn(
                      'font-semibold text-sm',
                      isDark ? 'text-white' : 'text-slate-900'
                    )}>
                      {format.name}
                    </h4>
                    <p className={cn(
                      'text-xs mt-0.5',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      {format.description}
                    </p>
                  </div>
                </div>
                
                {isSelected && (
                  <span className={colors.text}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={cn(
                  'text-xs',
                  isDark ? 'text-slate-500' : 'text-slate-500'
                )}>
                  .{format.fileExtension} file
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(format.id)
                  }}
                  disabled={isDownloading}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                    'flex items-center gap-1.5',
                    isDownloading
                      ? 'opacity-50 cursor-not-allowed'
                      : isSelected
                        ? cn('bg-gradient-to-r', 
                            format.id === 'react' ? 'from-cyan-500 to-blue-500' :
                            format.id === 'vue' ? 'from-emerald-500 to-teal-500' :
                            'from-orange-500 to-amber-500',
                            'text-white'
                          )
                        : isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  )}
                >
                  {isCurrentlyDownloading ? (
                    <>
                      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className={cn(
        'px-5 py-3 border-t',
        isDark ? 'border-slate-800' : 'border-slate-100'
      )}>
        <div className="flex items-center justify-center gap-2">
          <svg className={cn(
            'w-4 h-4',
            isDark ? 'text-slate-500' : 'text-slate-400'
          )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={cn(
            'text-xs',
            isDark ? 'text-slate-500' : 'text-slate-500'
          )}>
            All formats include 16 components + 5 demo pages
          </span>
        </div>
      </div>
    </div>
  )
}

export default DownloadSelector
