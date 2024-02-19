import { type Profile } from 'entities/Profile'
import { ValidateProfileError } from '../../consts/consts'

export const validateProfileData = (profile?: Profile): ValidateProfileError[] => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA]
  }

  const { age, first, lastname, country } = profile
  const errors: ValidateProfileError[] = []

  if (!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA)
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY)
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE)
  }

  return errors
}
