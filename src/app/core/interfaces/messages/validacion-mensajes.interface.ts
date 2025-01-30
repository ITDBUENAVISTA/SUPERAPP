export interface ValidationMessagesModel {
  [key: string]: ValidationMessageModel[];
}

export interface ValidationMessageModel {
  type: string;
  message: string;
};
