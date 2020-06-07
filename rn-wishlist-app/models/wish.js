class Wish {
    constructor(id, ownerId, title, description, imageUrl, price, joy, takenId, bought) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.joy = joy;
        this.takenId = takenId;
        this.bought = bought;
    }
}

export default Wish;
