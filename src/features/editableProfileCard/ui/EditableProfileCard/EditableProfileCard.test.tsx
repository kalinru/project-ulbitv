import { screen } from '@testing-library/react'
import { EditableProfileCard } from './EditableProfileCard'
import { renderComponent } from '@/shared/lib/tests/renderComponent'
import { type Profile } from '@/entities/Profile'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { profileReducer } from '../../model/slice/profileSlice'
import userEvent from '@testing-library/user-event'
import { $api } from '@/shared/api/api'

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'rusel',
  age: 465,
  currency: Currency.USD,
  country: Country.Russian,
  city: 'Moscow',
  username: 'admin213'
}

const options = {
  initialState: {
    profile: {
      form: profile,
      data: profile,
      isLoading: false,
      error: undefined,
      readonly: true,
      validateErrors: undefined
    },
    user: {
      authData: {
        id: '1'
      }
    }
  },
  asyncReducers: { profile: profileReducer }
}

describe('features.EditableProfileCard', () => {
  beforeEach(() => {
    renderComponent(<EditableProfileCard id='1'/>, options)
  })

  test('При нажатии на кнопку РЕДАКТИРОВАТЬ появляется кнопка ОТМЕНЫ', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
  })

  test('При нажатии ОТМЕНА данные в форме возвращаются к исходным', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    expect(screen.getByTestId('ProfileCard.first')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('rusel')

    await userEvent.clear(screen.getByTestId('ProfileCard.first'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))
    expect(screen.getByTestId('ProfileCard.first')).toHaveValue('')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('')

    await userEvent.type(screen.getByTestId('ProfileCard.first'), 'firstname')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'lastname')
    expect(screen.getByTestId('ProfileCard.first')).toHaveValue('firstname')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('lastname')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))
    expect(screen.getByTestId('ProfileCard.first')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('rusel')
  })

  test('Валидация формы (поле first обязательно)', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    await userEvent.clear(screen.getByTestId('ProfileCard.first'))
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))
    expect(screen.getByTestId('EditableProfileCard.Error.Text')).toBeInTheDocument()
  })

  test('Если данные формы валидны, на сервер отправляется PUT запрос', async () => {
    const mockPuRequest = jest.spyOn($api, 'put')
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    await userEvent.type(screen.getByTestId('ProfileCard.first'), 'firstname')
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))
    expect(mockPuRequest).toHaveBeenCalled()
  })
})
