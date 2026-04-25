'use client'

import { useEffect } from 'react'
import * as amplitude from '@amplitude/analytics-browser'

const API_KEY = 'feadbbfb68fe17f045a4c7a0b212920a'

let initialized = false

export function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (initialized) return
    initialized = true

    amplitude.init(API_KEY, undefined, {
      autocapture: {
        pageViews: true,
        sessions: true,
        elementInteractions: false,
        formInteractions: false,
      },
    })
  }, [])

  return <>{children}</>
}

// 이벤트 로깅 헬퍼
export const Analytics = {
  pageView: (page: string, properties?: Record<string, unknown>) => {
    amplitude.track('page_view', { page, ...properties })
  },

  emojiCopied: (content: string, category: string, group: string) => {
    amplitude.track('emoji_copied', { content, category, group, platform: 'web' })
  },

  searchUsed: (query: string, resultCount: number) => {
    amplitude.track('search_used', { query_length: query.length, result_count: resultCount, platform: 'web' })
  },

  filterApplied: (categoryId: string) => {
    amplitude.track('filter_applied', { category_id: categoryId, platform: 'web' })
  },

  groupChanged: (group: string) => {
    amplitude.track('group_changed', { group, platform: 'web' })
  },

  appStoreClicked: () => {
    amplitude.track('app_store_clicked', { platform: 'web' })
  },
}
