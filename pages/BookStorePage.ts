import { Page, Locator } from 'playwright';

export class BookStorePage {
  private page: Page;
  private bookLink: Locator;
  private addToCollectionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookLink = this.page.locator(`:text("Git Pocket Guide")`);
    this.addToCollectionButton = this.page.locator('button:has-text("Add To Your Collection")');
  }

  async goToBookStore() {
    await this.page.goto('/books');
  }

  async selectBook(bookTitle: string) {
    const bookLocator = this.page.locator(`:text("${bookTitle}")`);
    await bookLocator.click();
  }

  async addBookToCollection() {
    const bookUrl = await this.bookLink.getAttribute('href');
    
    // Перехід на сторінку книги
    await this.page.goto('/books?book=9781449325862');

    // Натискання кнопки "Add To Your Collection"
    await this.addToCollectionButton.click();
  }
}
