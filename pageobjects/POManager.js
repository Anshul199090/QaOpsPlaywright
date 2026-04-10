import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { MycartPage } from "./MycartPage";
import { PaymentPage } from "./PaymentPage";
import { OrdersreviewPage } from "./OrdersreviewPage"
import { OrdershistoryPage } from "./OrdershistoryPage";
import { OrderSummaryPage } from "./OrderSummaryPage";

export class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.mycartPage = new MycartPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.ordersreviewPage = new OrdersreviewPage(this.page);
        this.orderhistoryPage = new OrdershistoryPage(this.page);
        this.ordersummaryPage = new OrderSummaryPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getMycartPage() {
        return this.mycartPage;
    }

    getPaymentPage() {
        return this.paymentPage;
    }

    getOrdersreviewPage() {
        return this.ordersreviewPage;
    }

    getOrdershistoryPage() {
        return this.orderhistoryPage;
    }

    getOrderSummaryPage() {
        return this.ordersummaryPage;
    }
}