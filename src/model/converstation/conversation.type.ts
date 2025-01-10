import allStaticValues, { AllowedValues } from '../../constants/staticValues'

export interface IConversation {
      type: AllowedValues['ConversationType'] | string
      name: string,
}