PGDMP     .                    {           Products    15.3    15.3 
    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                        0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    Products    DATABASE     �   CREATE DATABASE "Products" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1252';
    DROP DATABASE "Products";
                postgres    false            �            1259    16402    products    TABLE     �   CREATE TABLE public.products (
    id integer NOT NULL,
    idshop integer NOT NULL,
    name text NOT NULL,
    price numeric NOT NULL,
    discount numeric NOT NULL,
    imageurl text NOT NULL,
    "createdAt" date,
    "updatedAt" text
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16399    shops    TABLE     �   CREATE TABLE public.shops (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    href text NOT NULL,
    iconurl text,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.shops;
       public         heap    postgres    false            �          0    16402    products 
   TABLE DATA           i   COPY public.products (id, idshop, name, price, discount, imageurl, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   p
       �          0    16399    shops 
   TABLE DATA           _   COPY public.shops (id, name, description, href, iconurl, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   �       k           2606    16412    products Products_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.products DROP CONSTRAINT "Products_pkey";
       public            postgres    false    215            i           2606    16406    shops Shops_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.shops
    ADD CONSTRAINT "Shops_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.shops DROP CONSTRAINT "Shops_pkey";
       public            postgres    false    214            �   <  x���=o�0Eg�c�6_k�TU�@�HU�Z�&�Ȅ������v�+1!�=�K��~6�2�K�x*Y�.éS�n4�s>?�]{6Jݧ^?�)�;v|�O�_у�ϖҾ	�`��
��ѲT� V +�\�v8�n��"|Y�{c��RWa���_�*|� �g����;�N���V��J��0)������^��Hb+�����i,�GfB82�X�q���wF��]�2�N85���\�3B_��Q��u�(�e$>�
������<�l�����qrTywuu��6L���Q��O����qϼ�QSo�:��qu�4I�^��      �   �   x���M
�@�u����\@���U7��60Nl&C������<x|<�����*J#��QLl�G2�%&�,+��'N�s|!�vpΚDKU�������r� ��U����F9�J>B���En?�+�&���t"���_�x{��g��N�}h     