class APiUtils{

    constructor(apiContext, requestPayload){
        this.apiContext = apiContext;
        this.requestPayload = requestPayload;
    }

    async getToken(){

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:this.requestPayload});
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(ordersPayload){
        let response = {};
        response.token = await this.getToken();
         const ordersResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                data: ordersPayload,
                headers: {
                    'authorization' : response.token,
                    'content-type' : 'application/json'
                }
            });
            const ordersResponseJson = await ordersResponse.json();
            const orderId = ordersResponseJson.orders[0];
            console.log(orderId);
            response.orderId = orderId;
            return response;
    }
}

module.exports = {APiUtils};