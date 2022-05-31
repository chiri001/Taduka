//adds classes for website layout

const classes = {
  section: {
    margineTop: 1,
    marginBottom: 1,
  },

  smallText: {
    fontSize: '15px',
  },

  brand: {
    fontWeight: 'bold',
    fontSize: '1.7rem',
  },

  main: {
    marginTop: 5,
    marginBottom: 5,
    minHeight: '80vh',
    marginLeft: 3,
    borderRadius: 4,
  },
  footer: {
    marginetop: 1,
    textAlign: 'center',
  },
  appbar: {
    '& a': {
      color: '#4b0096',
      marginLeft: 1,
    },
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  fullWidth: {
    width: '100%',
  },
  visible: {
    display: 'initial',
  },
  hidden: {
    display: 'none',
  },
  searchForm: {
    border: '1px solid #000000',
    backgroundColor: '#ffffff',
    borderRadius: 1,
    display: 'flex',
    flex: 1,
  },
  searchInput: {
    paddingLeft: 1,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  searchInputMini: {
    paddingLeft: 1,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
    width: '93%',
  },
  searchButton: {
    paddingRight: 1,
    color: '#6a0dad',
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
  },

  box: {
    border: '5px solid',
    backgroundColor: '#D3D3D3',
    marginLeft: '3%',
    marginRight: '3%',
    borderRadius: 5,
    borderColor: '#D3D3D3',
  },
};

export default classes;
