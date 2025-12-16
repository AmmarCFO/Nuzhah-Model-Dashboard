
import { Scenario, ScenarioType, MarketingVideo, Branch } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'hybrid',
    type: ScenarioType.HYBRID,
    name: 'Smart Hybrid',
    color: '#8A6E99', // Purple
    description: 'Strategic mix: Short Term Rentals (Jan-Mar, Dec) at 60% occupancy and Long Term Rentals (Apr-Nov) at 80% occupancy.',
    
    financials: {
        worst: {
            revenue: 508102,
            mabaatShare: 101620, // 20% Operator Fees as per CSV
            netIncome: 406481,    // Net to Owner as per CSV
            roi: 8.13
        },
        base: {
            revenue: 508102,
            mabaatShare: 101620, // 20% Operator Fees
            netIncome: 406481,    // Net to Owner
            roi: 8.13
        },
        best: {
            revenue: 508102,
            mabaatShare: 101620, // 20% Operator Fees
            netIncome: 406481,    // Net to Owner
            roi: 8.13
        }
    },

    propertyValue: 5000000,
    
    unitCount: 9,
    unitLabel: 'Units',
    occupancyDurationLabel: 'STR (60%) + LTR (80%)',
    
    unitMix: [
        { name: 'Large 2BR (Ground)', count: 1, avgPrice: 85000, videoUrl: 'https://drive.google.com/file/d/17eGM0LP1KL8MHl2Xm4pc44YEgUHcZttY/view?usp=sharing' },
        { name: '1BR Apts (1st Flr)', count: 4, avgPrice: 65000, videoUrl: 'https://drive.google.com/file/d/1HQcwyoH8d2QUQApnpPaEIqyH4ioc43P3/view?usp=sharing' },
        { name: 'Small 2BR (2nd Flr)', count: 2, avgPrice: 70000, videoUrl: 'https://drive.google.com/file/d/1CorUdlzXI_Gc5Ngmz3-FQzKQi3sRHkFy/view?usp=sharing' },
        { name: 'Studios (2nd Flr)', count: 2, avgPrice: 50000, videoUrl: 'https://drive.google.com/file/d/1d2N78F4ULWmVrBIMFWz7Df4d0X95L-J5/view?usp=sharing' },
    ],
  },
  {
    id: 'short_term',
    type: ScenarioType.SHORT_TERM,
    name: 'Short Term Rental',
    color: '#D4AF37', // Gold
    description: 'Maximizing yield through daily rentals (Airbnb/Booking.com) year-round, capitalizing on high turnover and premium daily rates.',
    
    financials: {
        worst: {
            revenue: 830412,
            // OTA Fee (15.5% of Gross): 128,714
            // Net Revenue: 701,698
            mabaatShare: 140340, // 20% of Net Revenue (after OTA)
            netIncome: 561358, 
            roi: 11.23
        },
        base: {
            revenue: 1009537,
            // OTA Fee (15.5% of Gross): 156,478
            // Net Revenue: 853,059
            mabaatShare: 170612, // 20% of Net Revenue (after OTA)
            netIncome: 682447,
            roi: 13.65
        },
        best: {
            revenue: 1187208,
            // OTA Fee (15.5% of Gross): 184,017
            // Net Revenue: 1,003,191
            mabaatShare: 200638, // 20% of Net Revenue (after OTA)
            netIncome: 802553,
            roi: 16.05
        }
    },

    propertyValue: 5000000,
    
    unitCount: 9,
    unitLabel: 'Units',
    occupancyDurationLabel: 'Daily Rentals',
    
    unitMix: [
        { 
            name: 'Large 2BR (Ground)', 
            count: 1, 
            avgPrice: 173747,
            priceRange: { min: 427, avg: 483, max: 538 },
            videoUrl: 'https://drive.google.com/file/d/17eGM0LP1KL8MHl2Xm4pc44YEgUHcZttY/view?usp=sharing'
        },
        { 
            name: '1BR Apts (1st Flr)', 
            count: 4, 
            avgPrice: 117810,
            priceRange: { min: 242, avg: 327, max: 412 },
            videoUrl: 'https://drive.google.com/file/d/1HQcwyoH8d2QUQApnpPaEIqyH4ioc43P3/view?usp=sharing'
        },
        { 
            name: 'Small 2BR (2nd Flr)', 
            count: 2, 
            avgPrice: 95561,
            priceRange: { min: 235, avg: 265, max: 296 },
            videoUrl: 'https://drive.google.com/file/d/1CorUdlzXI_Gc5Ngmz3-FQzKQi3sRHkFy/view?usp=sharing'
        },
        { 
            name: 'Studios (2nd Flr)', 
            count: 2, 
            avgPrice: 86714,
            priceRange: { min: 221, avg: 241, max: 260 },
            videoUrl: 'https://drive.google.com/file/d/1d2N78F4ULWmVrBIMFWz7Df4d0X95L-J5/view?usp=sharing'
        },
    ],
  },
  {
    id: 'long_term',
    type: ScenarioType.LONG_TERM,
    name: 'Traditional LTR',
    color: '#2A5B64', // Teal
    description: 'Leasing the 9 apartments as standard furnished residential units with monthly contracts.',
    
    financials: {
        worst: {
            revenue: 549228, 
            mabaatShare: 164768, // 30% Fee
            netIncome: 384460, // 70% Net at 100% Occupancy
            roi: 7.69
        },
        base: {
            revenue: 632794,
            mabaatShare: 189838, // 30% Fee
            netIncome: 442956, // 70% Net at 100% Occupancy
            roi: 8.86
        },
        best: {
            revenue: 709762,
            mabaatShare: 212928, // 30% Fee
            netIncome: 496834, // 70% Net at 100% Occupancy
            roi: 9.94
        }
    },

    propertyValue: 5000000,
    
    unitCount: 9,
    unitLabel: 'Apartments',
    occupancyDurationLabel: '12 Months LTR',
    
    unitMix: [
        { 
            name: 'Large 2BR (Ground)', 
            count: 1, 
            avgPrice: 116976,
            priceRange: { min: 8476, avg: 9748, max: 10466 },
            videoUrl: 'https://drive.google.com/file/d/17eGM0LP1KL8MHl2Xm4pc44YEgUHcZttY/view?usp=sharing'
        },
        { 
            name: '1BR Apts (1st Flr)', 
            count: 4, 
            avgPrice: 65736,
            priceRange: { min: 4526, avg: 5478, max: 6431 },
            videoUrl: 'https://drive.google.com/file/d/1HQcwyoH8d2QUQApnpPaEIqyH4ioc43P3/view?usp=sharing'
        },
        { 
            name: 'Small 2BR (2nd Flr)', 
            count: 2, 
            avgPrice: 64332,
            priceRange: { min: 4662, avg: 5361, max: 5756 },
            videoUrl: 'https://drive.google.com/file/d/1CorUdlzXI_Gc5Ngmz3-FQzKQi3sRHkFy/view?usp=sharing'
        },
        { 
            name: 'Studios (2nd Flr)', 
            count: 2, 
            avgPrice: 62100,
            priceRange: { min: 4733, avg: 5175, max: 5617 },
            videoUrl: 'https://drive.google.com/file/d/1d2N78F4ULWmVrBIMFWz7Df4d0X95L-J5/view?usp=sharing'
        },
    ],
  }
];

export const MARKETING_VIDEOS: MarketingVideo[] = [
    {
        id: 'v1',
        title: 'Hybrid Living Experience',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        videoUrl: '#',
    },
    {
        id: 'v2',
        title: 'Al Nuzhah Location',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        videoUrl: '#',
    }
];

export const MABAAT_SHARE_PERCENTAGE = 0.30;
export const BRANCHES: Branch[] = [];
