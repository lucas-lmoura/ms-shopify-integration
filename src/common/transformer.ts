export abstract class Transformer {
  public async transform(item: any) {
    return item
  }

  public async item(item: any) {
    return { data: await this.transform(item) }
  }

  /**
   * @param items
   * Retorna o objecto encapsulado por {data : {}}
   * @param returnDat
   * @returns Object
   */
  public async collection(items: any[], returnData = true) {
    const data: any[] = []
    for (const item of items) {
      if (typeof item === 'object') data.push(await this.transform(item))
    }

    if (returnData) return { data: data }
    return data
  }

  public async paginate(data: any) {
    return {
      ...(await this.collection(data.items)),
      meta: {
        current_page: data.meta.currentPage,
        per_page: data.meta.itemsPerPage,
        total_items: data.meta.totalItems,
        total: data.meta.totalItems,
        last_page: data.meta.totalPages
      }
    }
  }
}
