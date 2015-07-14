module.exports = {
        recipes: function () {
                return module.recipes;
        },
        getNextId: function (){
                return 3;
        }
};

module.recipes = {
        1: {
                "id": "1",
                "title": "Cookies",
                "description": "Nice Description",
                "ingredients": [
                        {
                                "amount": "1",
                                "amountUnits": "packet",
                                "ingredientName": "Chips Ahoy"
                        }
                ],
                "instructions": "1. Go buy a packet of Chips Ahoy\n\
 2. Blah blah"
        },
        2: {
                "id": "2",
                "title": "Carrot Cake",
                "description": "Super Cool Description",
                "ingredients": [
                        {
                                "amount": "1",
                                "amountUnits": "packet",
                                "ingredientName": "Chips Ahoy"
                        }
                ],
                "instructions": "1. Go buy a packet of Chips Ahoy\n\
2. Blah blah"
        }
};
        