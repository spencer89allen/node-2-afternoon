// the controller houses the logic for when our endpoints are hit
module.exports = {
    creat: (req, res) => {

        const dbInstance = req.app.get('db');
        // ^ this is creating a variable for the database instance off of req.app and allowing us access to the dbInstance

        let { name, description, price, image_url } = req.body

        dbInstance.create_product([name, description, price, image_url]).then(() => {
            res.sendStatus(200) 
        }).catch((err) => {
            res.status(500).send({errMessage: "Opps! Something went wrong. Our engineers have been informed."});
            console.log(err)
        });
    },
// Read Product Function
    getOne: (req, res) => {

        // this is creating a variable for the database instance off of req.app and allowing us access to the dbInstance 
        const dbInstance = req.app.get('db')

        let { id } = req.params

        dbInstance.read_product([id]).then((product) => {
            res.status(200).send(product)
        }).catch((err) => {
            res.status(500).send({errMessage: "Opps! Something went wrong. Our engineers have been informed."});
            console.log(err)
        });
    },
// Read All Products Function
    getAll: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.read_products().then((products) => {
            res.status(200).send(products)
        }).catch((err) => {
            res.status(500).send({errMessage: "Opps! Something went wrong. Our engineers have been informed."});
            console.log(err)
        });
    },
// Update Product Function
    update: (req, res) => {

        const dbInstance = req.app.get('db')

        let { id } = req.params
        let { desc } = req.body

        dbInstance.update_product([desc, id]).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).send({errMessage: "Opps! Something went wrong. Our engineers have been informed."});
            console.log(err)
        });
    },
// Delete Product Function
    delete: (req, res) => {

        const dbInstance = req.app.get('db')

        let { id } = req.params

        dbInstance.delete_product([id]).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).send({errMessage: "Opps! Something went wrong. Our engineers have been informed."});
            console.log(err)
        });
        // another way to code things:
        // req.app.db.delete_product().then(() => {
        //      res.status(200).send('Deleted")
        // }).catch(() => {
        //      res.status(500).send('Delete Failed)
        // })
    }

}