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
	    Given I am logged in as a user
	    When I click on plus button
	    Then I should be able to submit the list name.
	    	

	    