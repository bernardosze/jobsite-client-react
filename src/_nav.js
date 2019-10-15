export default {
  items: [
    {
      title: true,
      name: 'Master Data',
      wrapper: {
        // optional wrapper object
        element: '', // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '' // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Customer',
      url: '/customer',
      icon: 'fa fa-address-card'
    },
    {
      name: 'Supplier',
      url: '/supplier',
      icon: 'fa fa-address-card'
    },
    {
      name: 'Quote',
      url: '/quote',
      icon: 'fa fa-address-card'
    },
    {
      name: 'Repair',
      url: '/repair',
      icon: 'fa fa-address-card'
    }
  ]
};
