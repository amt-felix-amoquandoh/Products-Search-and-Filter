// menuList.ts

export interface MenuItem {
    title: string;
    url: string;
    cName: string;
    active: string;
  }
  
  export const menuList: MenuItem[] = [
      
      {
        title: "Customer",
        url: "/customer-signup",
        cName: "navLinks",
        active: "activeItem",
      },
      {
        title: "Business",
        url: "/business-signup",
        cName: "navLinks",
        active: "activeItem",
      },
    //   
  ];
  

