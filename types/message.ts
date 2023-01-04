export default interface Message {
  id?: number;
  content: string;
  datetime: Date;
  isGptResponse: boolean;
}
