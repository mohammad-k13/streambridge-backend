import allStaticValues, { AllowedValues } from '../../constants/types'

export interface IConversation {
      type: AllowedValues['ConversationType'] | string
      name: string,
}