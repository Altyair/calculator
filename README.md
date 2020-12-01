# Mathematical calculator

This calculator is a standard simple calculator for performing mathematical calculations.
Calculator allows you to group actions using brackets: [ ]. Brackets allow you to distinguish and define the sequence of actions.

To install, run:

npm i mathematical-calculator

How to use:

in html:
create a container for the calculator:   
`<div class="calculator-altyair"></div>`

in js:<br>
`import { CalculatorFacade } from 'mathematical-calculator';`

`const calculator = new CalculatorFacade({type: 'simple'});`
`calculator.create();`

