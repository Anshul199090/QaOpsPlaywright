Feature: Ecommerce validations

    Scenario: Placing order
        Given a login to ecommerce application with "abedi19909090911@gmail.com" and "Sheaffer@11"
        When Add "zara coat 3" to the cart
        Then Verify "zara coat 3" is displayed in the cart
        When Enter valid details and Place the order
        Then Verify order in present in the OrderHistory.