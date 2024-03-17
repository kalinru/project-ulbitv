import { type Country } from '@/entities/Country'
import { type Currency } from '@/entities/Currency'

import { type Profile } from '../../model/types/profile'

export interface ProfileCardProps {
  className?: string
  data?: Profile
  error?: string
  isLoading?: boolean
  readOnly?: boolean
  onChangeLastName?: (value?: string) => void
  onChangeFirstName?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
}
