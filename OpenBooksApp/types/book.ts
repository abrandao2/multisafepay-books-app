interface Book {
  Key: string;
  Title: string;
  Author: string;
  ISBN: string;
  FirstPublishYear: number;
  CoverCode: number;
  Description?: string;
}

export default Book;