export default function Head(): JSX.Element {
    <link rel='manifest' href='/manifest.webmanifest' />;

    return (
        <head>
            <link rel='icon' type='image/x-icon' href='/favicon.ico' />
            <meta name='theme-color' content='#000000' />
            <meta name='msapplication-navbutton-color' content='#000000' />
            <meta
                content='width=device-width, initial-scale=1'
                name='viewport'
            />
        </head>
    );
}
