import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { UiDesignSwitcher } from '@/features/uiDesignSwitcher'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'
import { Page } from '@/widgets/Page'

const SettingsPage = memo(() => {
  const { t } = useTranslation()

  return (
    <Page>
      <VStack gap="16" max>
        <Text bold size="xl">
          {t('Настройки')}
        </Text>
        <UiDesignSwitcher />
      </VStack>
    </Page>
  )
})

SettingsPage.displayName = 'SettingsPage'

export default SettingsPage
