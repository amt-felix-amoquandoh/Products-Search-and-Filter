// menuList.ts

export interface MenuItem {
    title: string;
    url: string;
    cName: string;
    active: string;
  }
  
  export const menuList: MenuItem[] = [
   
    {
      title: "Accomodation",
      url: "/accomodation",
      cName: "navLinks",
      active: "activeItem",
    },
    {
      title: "Hotel",
      url: "/hotel",
      cName: "navLinks",
      active: "activeItem",
    },
    {
        title: "Car Rentals",
        url: "/carrentals",
        cName: "navLinks",
        active: "activeItem",
      },
      {
        title: "Flights",
        url: "/flights",
        cName: "navLinks",
        active: "activeItem",
      },
      
    //   {
    //     title: "ContactUs",
    //     url: "/contactus",
    //     cName: "navLinks",
    //     active: "activeItem",
    //   }
  ];
  