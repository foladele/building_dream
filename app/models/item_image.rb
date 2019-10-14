class ItemImage < ApplicationRecord
	belongs_to :section

	# has_attached_file :image, #styles: { large: '1000x1000>', medium: "300x300>", thumb: "100x100#" }, default_url: "/images/:style/missing.png"
 #  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_attached_file :image, styles: { large: '1000x1000>', medium: "300x300>", thumb: "200x200>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

	 def as_json(_opts = {})
	 {
		  id: id,
		  image: image_url_large,
		  title: title,
	    description: description,
	    kind: kind,
		  errors: errors
	 }
	 end

   def image_url_large
    image.url(:large)
   end
end
