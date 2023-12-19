import { BaseEntity } from 'typeorm'

export abstract class BaseModel extends BaseEntity {
  fillable: string[]

  public fillValues(data: any): void {
    const fillable = this.fillable || []
    const self: any = this
    Object.keys(data).forEach((key) => {
      if (!fillable || fillable.indexOf(key) !== -1) {
        self[key] = data[key]
      }
    })
  }
}
