class AddKindToSections < ActiveRecord::Migration[5.1]
  def change
    add_column :sections, :kind, :string
  end
end
