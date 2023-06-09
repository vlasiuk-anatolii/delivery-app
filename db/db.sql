PGDMP     6                    {           Products    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16398    Products    DATABASE     �   CREATE DATABASE "Products" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1252';
    DROP DATABASE "Products";
                postgres    false            �            1259    24601    orders    TABLE     P  CREATE TABLE public.orders (
    id uuid NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    "order" text NOT NULL,
    total text NOT NULL,
    address text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16402    products    TABLE     �   CREATE TABLE public.products (
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
    "updatedAt" date,
    lat numeric NOT NULL,
    lng numeric NOT NULL
);
    DROP TABLE public.shops;
       public         heap    postgres    false                      0    24601    orders 
   TABLE DATA           k   COPY public.orders (id, name, email, phone, "order", total, address, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �                 0    16402    products 
   TABLE DATA           i   COPY public.products (id, idshop, name, price, discount, imageurl, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �                 0    16399    shops 
   TABLE DATA           i   COPY public.shops (id, name, description, href, iconurl, "createdAt", "updatedAt", lat, lng) FROM stdin;
    public          postgres    false    214   H       q           2606    16412    products Products_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.products DROP CONSTRAINT "Products_pkey";
       public            postgres    false    215            o           2606    16406    shops Shops_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.shops
    ADD CONSTRAINT "Shops_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.shops DROP CONSTRAINT "Shops_pkey";
       public            postgres    false    214            s           2606    24609    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    216               4  x��WMn�H^ۧ���.��ի{L�F3,°���iӍ�c�#��H�`N���hĂ387�:,����Id�vU=�������-2V)��Xg�RD�B����ZZ <�������������wiㆀfG���z�e���_�Y��s�čy��<~��N\���q/��جAʵ��u_��f�+�O���ĭ������eז�b���ι�o=��剿��i�zX�g�M�>�ѫ�>k�	ě"`�/L5���ufa��Y���!����&���4���w�n\Q��@�*	~!�,*��QyM(��8��#�eAZY��Y��b��T�1C���W��R?����p�\7����/��J�,$#9U9�)ꩅvB��V�LA���qE2��(�5��&��}u�]v�x��px1���(ߏ�����������]�����Q�ծ�.�B��ΌDRTP���,1Y�Ds^"V� ��A?NA��e����>�S����6y�PXiM���)�OAᳯ䂔�*S`�Jm��N�ޝ�޷o�^�Y�����o+7�<�t�)�#(4#��8�
�8E�3�~��o��q��Oڣk������hǮ�pxx8 � �B��'�ٰ������/Y��` rASzW����,��ԩ�j�����)��������7�^z���-��v��M��Ԕ/�7_p��7[ǭm���:zp��?��?��$:Z�/�$z�.֍������d"���#&�?T�i1!s'VZ�#�Mݲ�T��E1��b�����	p����V9xa�f�P�<����-�         >  x����n�0D��c�ۄUU���T��iB�LX��k
Ӎ]�������d[m����T2�.����n��s:?�]s�Z���<�)�Zv|qO�_Ѓ1ώҽ	�`������T� V +�\ئ?�n��"|Y�6c��S�aelʯ�s��]����sl�97^��ϖ�V+J��0)���������Hb+�������"3!q,����Hm�;#�M>|Q'��?��>���/��Hm��e�V2G9���YL��ʛ~v�89*7w}��+&D��ڼO�:���q���q����UD���i�$?↙         %  x�}�]��6��ɯ�^�f�|T����k����ۋJ{sL�bld�P����L2��F"ۇ�>~YtX�:m�
сo�@�%@>;'�#?!%i*&_�1���r�[�;����� E��c?���LZk�q�}"#ݺ��[�v�6&?/�r�s��}��&�m��ך�V��	^f�nA&����m������p�?�j����9�'u����/��mV�%M뢎r�e��U��`lG���~��<ߏ.2���2A�=�n6��#��4I�ݓƗ���a�8����4�$^�����?~|�g���U|��"���2�Q���%�$5t6�i�$ݰ��ț��eVՔ�Y�Q�U��uCYY1�ˣ��}R��l#2�7#�wdE_,�L�@��h��GB+�"�����֡e�j��	u$=Jș��0�f~Y������D�¹�vX��"X�p,� [=h)Z������x�AD�
'xN;%�;'.nz誌RVW)-YUT�#�4c,�Y�
���`B��=�z/��׻?)����{1^�7��>�GKB[�a��M�];`���CK�B�o^��̕@ldx8����J̰�a��CL�5&�Yڵ47��U.�ǏAX9K�������<N��E �<��Ow�؛�P�o�ߟ��o�,MV7uU��F�LӦ�Ӣ�y�cѡ�A+��7���6���0z<� �uF���{"=~gB�1�C[�ƫ�eY��B�7fL��!�(���ncb����N��d�4��?j���U��+Vb�2�Ǿ�#���yS�U4iZ����n��S�&     