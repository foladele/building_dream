class AddTypeToSections < ActiveRecord::Migration[5.1]
  def change
    add_column :sections, :type, :string
  end
end
