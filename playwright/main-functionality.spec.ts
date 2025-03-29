import { expect, test } from '@playwright/test';

test('Registering as a new user, creating a new challenge and adding an experience report', async ({
  page,
}) => {
  // Check landing page
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: 'BraveTribe logo' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Join now', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Are you ready to challenge' }),
  ).toBeVisible();

  await expect(page.getByRole('button', { name: "LET'S START" })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Learn more' })).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Welcome to Brave Tribe' }),
  ).toBeVisible();
  await expect(page.getByText('Brave Tribe is more than just')).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'BraveTribe logo large' }),
  ).toBeVisible();
  await expect(page.getByText('We are a close-knit group of')).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'people holding their shoulders' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'What Our Members Say' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Join Our Community Today' }),
  ).toBeVisible();
  await expect(page.getByText("If you're ready to step out,")).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'JOIN NOW', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('© 2025 Brave Tribe')).toBeVisible();

  await page.getByRole('button', { name: 'Join now', exact: true }).click();
  // Go to "Join" page and create an account
  await expect(
    page.getByRole('link', { name: 'BraveTribe logo' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();

  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();

  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Password', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: 'Confirm Password' }),
  ).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('playwright@test.com');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page
    .getByRole('textbox', { name: 'Username' })
    .fill('playwright-test-user');
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page
    .getByRole('textbox', { name: 'Password', exact: true })
    .fill('testTest1!');
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page
    .getByRole('textbox', { name: 'Confirm Password' })
    .fill('testTest1!');

  await page.getByRole('button', { name: 'Join' }).click();

  // Check home page as a logged in user

  await expect(
    page.getByRole('link', { name: 'BraveTribe logo' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Your goals' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Challenge Planner' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Experiences' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Friends' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Open notification feed' }),
  ).toBeVisible();
  await expect(page.getByRole('banner').getByText('PL')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
  await expect(page.getByText('Welcome, playwright-test-user')).toBeVisible();

  await page.getByRole('link', { name: 'Challenge Planner' }).click();
  await expect(
    page.getByRole('heading', { name: 'Challenge Planner' }),
  ).toBeVisible();
  await expect(page.getByText('Here you can manage your')).toBeVisible();

  await expect(page.getByRole('button', { name: 'New' })).toBeVisible();
  await page.getByRole('button', { name: 'New' }).click();

  await expect(
    page.getByRole('heading', { name: 'New challenge' }),
  ).toBeVisible();
  await expect(page.getByText('Here you can add a new')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Title:' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Planned Date:' }),
  ).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: 'Description:' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Title:' }).click();
  await page.getByRole('textbox', { name: 'Title:' }).fill('Selfie Challenge');

  await page.getByRole('button', { name: 'Planned Date:' }).click();
  await page.getByRole('button', { name: 'Go to next month' }).click();
  await page.getByRole('button', { name: 'Go to next month' }).click();
  await page.getByRole('gridcell', { name: '1', exact: true }).click();
  await page.getByRole('textbox', { name: 'Description:' }).click();
  await page
    .getByRole('textbox', { name: 'Description:' })
    .fill('Take selfies with as many strangers as possible within 10 minutes.');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(
    page.getByRole('cell', { name: 'Selfie Challenge' }),
  ).toBeVisible();

  await page.getByRole('cell', { name: 'Selfie Challenge' }).click();
  await expect(
    page.getByRole('heading', { name: 'Challenge details' }),
  ).toBeVisible();

  await expect(page.getByText('See the details of your')).toBeVisible();

  await expect(
    page.locator('[data-test-id="challenge-details-title"]'),
  ).toContainText('Selfie Challenge');

  await expect(page.getByText('Description:')).toBeVisible();

  await expect(
    page.locator('[data-test-id="challenge-details-description"]'),
  ).toContainText(
    'Take selfies with as many strangers as possible within 10 minutes.',
  );

  await page.getByRole('button', { name: 'New' }).click();
  await expect(
    page.getByRole('heading', { name: 'Add Experience' }),
  ).toBeVisible();
  await expect(page.getByText('Here you can add your')).toBeVisible();
  await expect(page.getByText('Title:')).toBeVisible();
  await page.getByRole('textbox', { name: 'Title:' }).click();
  await expect(page.getByText('Date:')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Date:' })).toBeVisible();
  await expect(page.getByText('Write about your experience:')).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: 'Write about your experience:' }),
  ).toBeVisible();
  await expect(page.getByText('Rating:')).toBeVisible();
  await page
    .locator('div')
    .filter({ hasText: /^Rating:$/ })
    .getByRole('img')
    .nth(4)
    .dblclick();
  await expect(
    page.getByRole('heading', { name: 'Additional details:' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Upload a photo' }),
  ).toBeVisible();
  await expect(page.getByText('Location:')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Location:' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Title:' }).click();
  await page
    .getByRole('textbox', { name: 'Title:' })
    .fill('Overcoming Hesitation: A Selfie Journey');
  await page.getByRole('button', { name: 'Date:' }).click();
  await page.getByRole('button', { name: 'Go to previous month' }).click();
  await page.getByRole('gridcell', { name: '1', exact: true }).first().click();
  await page
    .getByRole('textbox', { name: 'Write about your experience:' })
    .click();
  await page
    .getByRole('textbox', { name: 'Write about your experience:' })
    .fill(
      'I was hesitant at first, but after the first few people agreed, it became fun! Some even made silly faces for the pictures.',
    );

  await page.getByRole('button', { name: 'Save' }).click();
  await expect(
    page.getByRole('cell', { name: 'Overcoming Hesitation: A' }),
  ).toBeVisible();
  await page.getByRole('cell', { name: 'Overcoming Hesitation: A' }).click();
  await expect(
    page.getByRole('heading', { name: 'Experience Report' }),
  ).toBeVisible();
  await expect(
    page.locator('[data-test-id="experience-report-challenge-title"]'),
  ).toContainText('Selfie Challenge');
  await expect(
    page.locator('[data-test-id="experience-report-experience-title"]'),
  ).toContainText('Overcoming Hesitation: A Selfie Journey');
  await expect(page.getByRole('heading', { name: 'Challenge:' })).toBeVisible();
  await expect(
    page.locator('[data-test-id="experience-report-challenge-description"]'),
  ).toContainText(
    'Take selfies with as many strangers as possible within 10 minutes.',
  );
  await expect(
    page.getByRole('heading', { name: 'Experience:' }),
  ).toBeVisible();
  await expect(
    page.locator('[data-test-id="experience-report-experience-story"]'),
  ).toContainText(
    'I was hesitant at first, but after the first few people agreed, it became fun! Some even made silly faces for the pictures.',
  );

  await page.getByRole('banner').getByText('PL').click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.getByText('Manage your account and')).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Account' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Profile' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Username playwright-test-user' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Email playwright@test.com' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Password Change your password' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Delete account' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Delete account' }).click();
  await expect(
    page.getByLabel('Delete account').getByText('Delete account'),
  ).toBeVisible();
  await expect(page.getByText('Are you sure?')).toBeVisible();
  await expect(page.getByText('Type in "DELETE" to confirm')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('DELETE');
  await page.getByRole('button', { name: 'Delete' }).click();
});
