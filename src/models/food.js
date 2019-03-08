export default class Food {
  constructor(data) {
    this.name = data.food_name
    this.fat = data.nf_total_fat
    this.calories = data.nf_calories
    this.carbohydrates = data.nf_total_carbohydrate
    this.protein = data.nf_protein
    this.servingQty = data.serving_qty
    this.servingUnit = data.serving_unit
    this.imgUrl = data.photo.thumb
  }
}