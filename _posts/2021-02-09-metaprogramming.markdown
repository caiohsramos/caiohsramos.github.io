---
layout: post
title: "Metaprogramming"
date: 2021-02-09 19:04:35 -0300
categories: dev ruby
---

## Definition

> Programs that generate programs

Metaprogramming _may_ allow developers to be more productive by reducing the amount of code that needs to be written manually. It is worth to notice that the way it is built affects (a lot) the productivity.

The two main use cases are:

- Exposing internal execution mechanisms to code as APIs;
- Dynamic text expression execution that contains programming commands.

## Examples

### Base code generation

```bash
#! /bin/sh
echo '#! /bin/sh' > program
for i in $(seq 992)
do
  echo "echo $i" >> program
done
chmod +x program
```

### C/C++ macros

```cpp
#define RADTODEG(x) ((x) * 57.29578)
```

### Python eval/exec

```python
>>> eval("5 ** 7")
# 78125

>>> program = 'a = 5\nb = 10\nprint("Sum = ", a+b)'
>>> exec(program)
# Sum =  15
```

## In ruby

The Ruby language offers by default multiple ways to "metaprogram". Here are some real world examples:

### Identifying not implemented methods

Useful for generating infinity methods to classes

APIs

- [BasicObject/method_missing](https://apidock.com/ruby/BasicObject/method_missing)
- [Object/respond_to_missing?](https://apidock.com/ruby/Object/respond_to_missing%3F)

```ruby
class Roman
  ROMAN_TO_INT = {
    i: 1,
    v: 5,
    x: 10,
    l: 50,
    c: 100,
    d: 500,
    m: 1000
  }.freeze

  def roman_to_int(str)
    # This implementation does not matter :p
    numbers = str.downcase.chars.map { |char| ROMAN_TO_INT[char.to_sym] }.reverse
    numbers.inject([0, 1]) do |result_number, int|
      result, number = result_number
      int >= number ? [result + int, int] : [result - int, number]
    end.first
  end

  private

  def method_missing(method_name)
    str = method_name.to_s
    roman_to_int(str)
  end
end

roman = Roman.new
roman.iii # => 3
roman.cix # => 109
```

```ruby
# activesupport/lib/active_support/string_inquirer.rb
# frozen_string_literal: true

require "active_support/core_ext/symbol/starts_ends_with"

module ActiveSupport
  # Wrapping a string in this class gives you a prettier way to test
  # for equality. The value returned by <tt>Rails.env</tt> is wrapped
  # in a StringInquirer object, so instead of calling this:
  #
  #   Rails.env == 'production'
  #
  # you can call this:
  #
  #   Rails.env.production?
  #
  # == Instantiating a new StringInquirer
  #
  #   vehicle = ActiveSupport::StringInquirer.new('car')
  #   vehicle.car?   # => true
  #   vehicle.bike?  # => false
  class StringInquirer < String
    private
      def respond_to_missing?(method_name, include_private = false)
        method_name.end_with?("?") || super
      end

      def method_missing(method_name, *arguments)
        if method_name.end_with?("?")
          self == method_name[0..-2]
        else
          super
        end
      end
  end
end
```

### Dynamically creating methods

Useful mainly when we need to generate methods from a given list

APIs

- [Module/define_method](https://apidock.com/ruby/Module/define_method)

```ruby
# activerecord/lib/active_record/store.rb#L135
# ...
keys.each do |key|
  accessor_key = "#{accessor_prefix}#{key}#{accessor_suffix}"

  define_method("#{accessor_key}=") do |value|
    write_store_attribute(store_attribute, key, value)
  end

  define_method(accessor_key) do
    read_store_attribute(store_attribute, key)
  end

  define_method("#{accessor_key}_changed?") do
    return false unless attribute_changed?(store_attribute)
    prev_store, new_store = changes[store_attribute]
    prev_store&.dig(key) != new_store&.dig(key)
  end

  define_method("#{accessor_key}_change") do
    return unless attribute_changed?(store_attribute)
    prev_store, new_store = changes[store_attribute]
    [prev_store&.dig(key), new_store&.dig(key)]
  end

  define_method("#{accessor_key}_was") do
    return unless attribute_changed?(store_attribute)
    prev_store, _new_store = changes[store_attribute]
    prev_store&.dig(key)
  end
# ...
```

```ruby
module Loggable
  def logger
    @logger ||= default_logger
  end

  private

  def default_logger
    Rails.logger
  end

  %i[info warn debug error].each do |severity|
    define_method severity do |message, *args|
      data = args.first || {}
      data[:class_name] = self.class.name unless data.key?(:class_name)
      logger.send(severity, message, data)
    end
  end
end
```

### Dynamic method calls

Usually for composing method calls with external input

APIs

- [Object/send](https://apidock.com/ruby/Object/send)
- [Object/public](https://apidock.com/ruby/Object/public_send)

```ruby
class Book
  attr_accessor :title, :author, :length

  def assign_values(values)
    values.each_key do |key|
      send("#{key}=", values[key])
    end
  end
end

book_info = {
  title: 'Forrest Gump',
  author: 'Winston Groom',
  length: 300
}

book = Book.new

# vvvvv Not necessary vvvvv
# book.title = book_info[:title]
# book.author = book_info[:author]
# book.length = book_info[:length]

book.assign_values(book_info)
```

# Conclusion

Metaprogramming can become pretty natural and easy to use, that's when the danger comes, with ultra generic classes and poor understandable code. Take a look at Martin Fowler's article [Is a Ruby Code-base Hard to Understand?](https://www.martinfowler.com/articles/rubyAtThoughtWorks.html)
