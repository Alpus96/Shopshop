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
	    	

	Scenario:
	    Given that I have entered listname 
	    And I click on Lägatill button
	    And I see listName wiith remove button
	    When I click on remove button 
	    Then I should not see the removed list on the page.   