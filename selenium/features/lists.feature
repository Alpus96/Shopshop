Feature: As a user i should be able to have lists.

	Scenario Outline:
		Given I am <status> navigates to GroceryList page
		When I click on select list valj-kategory button
		Then I should see <categories>

		Examples:
			|     status    | categories |
			| not logged in | 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt' |
			|   logged in   | 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt' |


	
	Scenario:
	    Given that I have text box to add list name
	    When  I enter list name 
	    And I click on Lägatill button
	    Then I should get a list with name it has been mentioned.   
	    	

	    