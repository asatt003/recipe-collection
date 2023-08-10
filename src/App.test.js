import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('As a Chef, I want to store my recipes so that I can keep track of them.', () => {

  render(<App />);

  let recipeHeader = screen.getByText('My Recipes');
  expect(recipeHeader).toBeInTheDocument();
 
  let recipeList = screen.getByText('There are no recipes to list.');
  expect(recipeList).toBeInTheDocument();

  expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);
});

test("contains an add recipe button", () => {

  render(<App />);

  let recipeHeader = screen.getByText('My Recipes');
  let button = screen.getByRole('button', {name: 'Add Recipe'});
  
  expect(button).toBeInTheDocument();

  expect(recipeHeader.compareDocumentPosition(button)).toBe(4);
});

test("contains an add recipe button that when clicked opens a form", async () => {

  render(<App />);

  let button = screen.getByRole('button', {name: 'Add Recipe'});
  userEvent.click(button);

  let form = await screen.findByRole('form', undefined, {timeout:3000});

  expect(form).toBeInTheDocument();

  expect(screen.getByRole('textbox', {name: /Recipe name/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /instructions/i})).toBeInTheDocument();

  button = screen.queryByRole('button', {name: 'Add Recipe'});
  expect(button).toBeNull();
});

test("shows new recipe after adding", async () => {

  render(<App />);

  let button = screen.getByRole('button', {name: 'Add Recipe'});
  userEvent.click(button);

  let recipeNameBox = await screen.findByRole('textbox', {name: /Recipe name/i});
  let recipeInstructionBox = screen.getByRole('textbox', {name: /instructions/i});

  const recipeName = 'Tofu Scramble Tacos';
  const recipeInstructions = "1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas";
  userEvent.type(recipeNameBox, recipeName);
  userEvent.type(recipeInstructionBox, recipeInstructions);

  let submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  let recipe = await screen.findByText('Tofu Scramble Tacos');
});

const addNewRecipe = async (recipe, instructions) => {

  let button = screen.getByRole('button', {name: 'Add Recipe'});
  userEvent.click(button);

  let recipeNameBox = await screen.findByRole('textbox', {name: /Recipe name/i});
  let recipeInstructionBox = screen.getByRole('textbox', {name: /instructions/i});

  const recipeName = recipe;
  const recipeInstructions = instructions;
  userEvent.type(recipeNameBox, recipeName);
  userEvent.type(recipeInstructionBox, recipeInstructions);

  let submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

}

test("shows multiple recipes after adding", async () => {

  render(<App />);

  await addNewRecipe('Tofu Scramble Tacos', "1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas");
  await addNewRecipe('Meatball Lasagna', "1. Add meatballs. {enter} 2. Add cheese. {enter} 3. Add tomato sauce. {enter} 4. Stir. {enter} 5. You're good to go");
  await addNewRecipe('Soup', "1. Add water. {enter} 2. Grind a tomato. {enter} 3. Mix in pan and stir. {enter} 4. You're good to go.");

  expect(await screen.findByText('Tofu Scramble Tacos')).toBeInTheDocument();
  expect(await screen.findByText('Meatball Lasagna')).toBeInTheDocument();
  expect(await screen.findByText('Soup')).toBeInTheDocument();
});

