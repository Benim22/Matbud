/*
  # Initial Schema for Food Delivery App

  1. New Tables
    - restaurants
      - Basic restaurant information
      - Location and contact details
    - menu_items
      - Restaurant menu items
      - Prices and descriptions
    - orders
      - Customer orders
      - Delivery details
    - order_items
      - Individual items in orders
    - reviews
      - Customer reviews and ratings
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Restaurants table
CREATE TABLE restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  description text,
  city text NOT NULL,
  image_url text,
  rating numeric(3,2) DEFAULT 0,
  delivery_options jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true
);

-- Menu items table
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  restaurant_id uuid REFERENCES restaurants(id),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  image_url text,
  category text,
  is_available boolean DEFAULT true
);

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id),
  restaurant_id uuid REFERENCES restaurants(id),
  delivery_option jsonb NOT NULL,
  status text DEFAULT 'pending',
  total_amount numeric(10,2) NOT NULL,
  delivery_address text NOT NULL,
  payment_status text DEFAULT 'pending',
  payment_method text
);

-- Order items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  menu_item_id uuid REFERENCES menu_items(id),
  quantity integer NOT NULL,
  price_at_time numeric(10,2) NOT NULL
);

-- Reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id),
  restaurant_id uuid REFERENCES restaurants(id),
  order_id uuid REFERENCES orders(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text
);

-- Enable Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public restaurants are viewable by everyone"
  ON restaurants FOR SELECT
  USING (true);

CREATE POLICY "Public menu items are viewable by everyone"
  ON menu_items FOR SELECT
  USING (true);

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create reviews for their orders"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = reviews.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view all reviews"
  ON reviews FOR SELECT
  USING (true);