export default {
    palette: {
        primary: {
          light: '#33c9dc',
          main: '#00bcd4',
          dark: '#008394',
          contrastText: '#fff'
        },
        secondary: {
          light: '#ff6333',
          main: '#ff3d00',
          dark: '#b22a00',
          contrastText: '#fff'
        }
      },
      spreadThis: {
                typography: {
                  useNextVariants: true
                },
                form:{
                  textAlign: 'center'
              },
              image: {
                  margin: '20px auto'
              },
              pageTitle: {
                  margin: '10px auto'
              },
              textField: {
                  margin: '10px auto'
              },
              button: {
                  marginTop: 20,
                  position: 'relative'
              },
              progress: {
                  position: 'absolute'
              },
              customError: {
                  color: 'red',
                  fontSize: '0.8rem',
                  marginTop: 10
              },
              invisibleSeperator: {
                border: 'none'
            },
            visibleSeperator: {
              width: '100%',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              marginBottom: 20
          }
      }
}