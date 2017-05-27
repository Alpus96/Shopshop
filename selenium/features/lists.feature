Feature: As a user i should be able to have lists.

	Scenario Outline:
		Given I am <status>
		When I visit the page
		Then I should see <categories>

		Examples:
			|     status    | categories |
			| not logged in | 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt' |
			|   logged in   | 'Fisk', 'Kött', 'Godis', 'Grönsaker','Frukt' |


	Scenario Outline:
	    Given I am <status>
	    When I click on plus button
	    Then I should be able to add a list.	

	    Examples:
	        |  status        |
	        |  not logged in |
	        |   logged in    |	