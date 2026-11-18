# Rodrigo Nickler — Portfolio

Static portfolio built with HTML, CSS and JavaScript. The site has English and Spanish pages.

## Local preview

Open `index.html` directly or run a simple static server from the repository root:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Contact form setup

The contact form uses [Web3Forms](https://web3forms.com/) so the site does not need PHP or a custom mail server.

1. Create a form/access key in the Web3Forms dashboard and verify the destination email address.
2. Open `js/contact-form.js`.
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the access key generated for this portfolio.
4. Test a submission on the deployed domain and confirm it reaches the destination inbox.

The Web3Forms access key is designed to be used in browser-side forms. Do not put SMTP passwords, private API tokens or other server credentials in this repository.

## Project cards

The project descriptions and technology tags are based on the corresponding source repositories and current demo implementations. Update both language versions together when adding or removing projects.
